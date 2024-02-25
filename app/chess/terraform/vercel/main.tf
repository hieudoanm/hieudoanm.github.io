terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "1.1.0"
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
  path = "app/chess/chess"
}

resource "vercel_deployment" "chess" {
  project_id  = vercel_project.chess.id
  files       = data.vercel_project_directory.chess.files
  path_prefix = "app/chess/chess"
  production  = true
}

resource "vercel_project_domain" "chess" {
  project_id = vercel_project.chess.id
  domain     = "chessinsights.vercel.app"
}
