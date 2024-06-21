terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "1.11.1"
    }
  }
}

resource "vercel_project" "news" {
  name      = "news"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "hieudoanm/hieudoanm"
  }
}

data "vercel_project_directory" "news" {
  path = "."
}

resource "vercel_deployment" "news" {
  project_id  = vercel_project.news.id
  files       = data.vercel_project_directory.news.files
  path_prefix = "."
  production  = true
}

resource "vercel_project_domain" "news" {
  project_id = vercel_project.news.id
  domain     = "news.vercel.app"
}
