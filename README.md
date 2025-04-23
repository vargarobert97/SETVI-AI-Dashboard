# Overview

The AI-Enhanced Intelligence Dashboard is a React.js application that allows users to manage reports with AI-powered content generation and summarization capabilities.

# Features

## Report Management

Create, edit, and delete reports

Rich-text content editing with TinyMCE

Drag-and-drop report reordering

## AI Integration

AI-generated draft reports

Content summarization

OpenAI API integration

## Data Persistence

LocalStorage for offline use

State preservation across sessions

# Note

Didn't have time to finish the following features:

Search and filter functionality

Activity and Authentication features

# Technologies Used

## Frontend

React.js with TypeScript

Material UI (MUI)

Zustand for state management

dnd-kit for drag-and-drop

TinyMCE rich text editor

## AI Integration

OpenAI API (gpt-3.5-turbo model)

# Installation

git clone

cd my-app

# Install dependencies:

npm install

# Create a .env file in the root of the project

REACT_APP_OPENAI_API_KEY=your-api-key-here

REACT_APP_TINY_MCE_API_KEY=your-api-key-here

# Start the development server

npm start
