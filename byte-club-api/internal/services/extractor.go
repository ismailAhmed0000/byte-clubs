package services

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/anthropics/anthropic-sdk-go"
)

type ExtractedRecipe struct {
	Title        string   `json:"title"`
	Ingredients  []string `json:"ingredients"`
	Instructions []string `json:"instructions"`
}

func ExtractRecipe(videoURL string) (*ExtractedRecipe, error) {
	platform, err := detectPlatform(videoURL)
	if err != nil {
		return nil, err
	}

	caption, err := fetchCaption(videoURL, platform)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch caption: %w", err)
	}

	if strings.TrimSpace(caption) == "" {
		return nil, fmt.Errorf("no caption found for this video")
	}

	recipe, err := structureRecipe(caption)
	if err != nil {
		return nil, fmt.Errorf("failed to structure recipe: %w", err)
	}

	return recipe, nil
}

func detectPlatform(videoURL string) (string, error) {
	switch {
	case strings.Contains(videoURL, "tiktok.com"):
		return "tiktok", nil
	case strings.Contains(videoURL, "instagram.com"):
		return "instagram", nil
	default:
		return "", fmt.Errorf("unsupported platform: only TikTok and Instagram URLs are supported")
	}
}

func fetchCaption(videoURL, platform string) (string, error) {
	switch platform {
	case "tiktok":
		return fetchTikTokCaption(videoURL)
	case "instagram":
		return fetchInstagramCaption(videoURL)
	default:
		return "", fmt.Errorf("unsupported platform: %s", platform)
	}
}

type oEmbedResponse struct {
	Title string `json:"title"`
}

func fetchTikTokCaption(videoURL string) (string, error) {
	endpoint := "https://www.tiktok.com/oembed?url=" + url.QueryEscape(videoURL)

	resp, err := http.Get(endpoint)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("tiktok oembed returned status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var parsed oEmbedResponse
	if err := json.Unmarshal(body, &parsed); err != nil {
		return "", err
	}

	return parsed.Title, nil
}

func fetchInstagramCaption(videoURL string) (string, error) {
	accessToken := os.Getenv("INSTAGRAM_ACCESS_TOKEN")
	if accessToken == "" {
		return "", fmt.Errorf("instagram extraction requires INSTAGRAM_ACCESS_TOKEN (Meta Graph API access token) to be configured")
	}

	endpoint := fmt.Sprintf(
		"https://graph.facebook.com/v20.0/instagram_oembed?url=%s&fields=title&access_token=%s",
		url.QueryEscape(videoURL), url.QueryEscape(accessToken),
	)

	resp, err := http.Get(endpoint)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("instagram oembed returned status %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var parsed oEmbedResponse
	if err := json.Unmarshal(body, &parsed); err != nil {
		return "", err
	}

	return parsed.Title, nil
}

func structureRecipe(caption string) (*ExtractedRecipe, error) {
	client := anthropic.NewClient()

	prompt := "Extract a recipe from this video caption and respond with ONLY valid JSON " +
		"(no markdown, no commentary) matching exactly this shape:\n" +
		`{"title": string, "ingredients": string[], "instructions": string[]}` +
		"\n\nIf no recipe is present, return empty arrays and an empty title." +
		"\n\nCaption:\n" + caption

	resp, err := client.Messages.New(context.Background(), anthropic.MessageNewParams{
		Model:     anthropic.ModelClaudeOpus4_8,
		MaxTokens: 2048,
		Messages: []anthropic.MessageParam{
			anthropic.NewUserMessage(anthropic.NewTextBlock(prompt)),
		},
	})
	if err != nil {
		return nil, err
	}

	var rawText string
	for _, block := range resp.Content {
		if text, ok := block.AsAny().(anthropic.TextBlock); ok {
			rawText += text.Text
		}
	}

	rawText = strings.TrimSpace(rawText)
	rawText = strings.TrimPrefix(rawText, "```json")
	rawText = strings.TrimPrefix(rawText, "```")
	rawText = strings.TrimSuffix(rawText, "```")
	rawText = strings.TrimSpace(rawText)

	var recipe ExtractedRecipe
	if err := json.Unmarshal([]byte(rawText), &recipe); err != nil {
		return nil, fmt.Errorf("could not parse model output as JSON: %w", err)
	}

	return &recipe, nil
}
