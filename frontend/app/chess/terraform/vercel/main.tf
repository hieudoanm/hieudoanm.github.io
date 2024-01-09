terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "~> 1.0"
    }
  }
}

resource "vercel_project" "chess_web" {
  name      = "chessinsightsweb"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "hieudoanm/hieudoanm"
  }
}

data "vercel_project_directory" "chess_web" {
  path = "projects/chess.com/web"
}

resource "vercel_deployment" "chess_web" {
  project_id  = vercel_project.chess_web.id
  files       = data.vercel_project_directory.chess_web.files
  path_prefix = "projects/chess.com/web"
  production  = true
}

resource "vercel_project_domain" "chess_web" {
  project_id = vercel_project.chess_web.id
  domain     = "chessinsightsweb.vercel.app"
}
