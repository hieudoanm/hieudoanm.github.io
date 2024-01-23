terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "1.0.0"
    }
  }
}

resource "vercel_project" "chess" {
  name      = "chess"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "hieudoanm/hieudoanm.github.io"
  }
}

data "vercel_project_directory" "chess" {
  path = "frontend/app/chess"
}

resource "vercel_deployment" "chess" {
  project_id  = vercel_project.chess.id
  files       = data.vercel_project_directory.chess.files
  path_prefix = "frontend/app/chess"
  production  = true
}

resource "vercel_project_domain" "chess" {
  project_id = vercel_project.chess.id
  domain     = "chessinsights.vercel.app"
}
