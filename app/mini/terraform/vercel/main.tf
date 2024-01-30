terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "1.0.0"
    }
  }
}

resource "vercel_project" "mini" {
  name      = "mini"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "hieudoanm/hieudoanm.github.io"
  }
}

data "vercel_project_directory" "mini" {
  path = "frontend/app/mini"
}

resource "vercel_deployment" "mini" {
  project_id  = vercel_project.mini.id
  files       = data.vercel_project_directory.mini.files
  path_prefix = "frontend/app/mini"
  production  = true
}

resource "vercel_project_domain" "mini" {
  project_id = vercel_project.mini.id
  domain     = "hieudoanmini.vercel.app"
}
