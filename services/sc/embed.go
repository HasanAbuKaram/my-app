package main

import (
	"embed"
)

//go:embed assets/*
var assets embed.FS

//go:embed version.txt
var version string

//go:embed repoUrl.txt
var repoUrl string

//go:embed index.html login.html x.html
var content embed.FS
