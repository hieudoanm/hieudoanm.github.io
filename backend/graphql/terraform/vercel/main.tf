terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "1.0.0"
    }
  }
}

resource "vercel_project" "graphql" {
  name      = "graphql"
  framework = "other"
  git_repository = {
    type = "github"
    repo = "hieudoanm/hieudoanm.github.io"
  }
}

data "vercel_project_directory" "graphql" {
  path = "frontend/graphql"
}

resource "vercel_deployment" "graphql" {
  project_id  = vercel_project.graphql.id
  files       = data.vercel_project_directory.graphql.files
  path_prefix = "frontend/graphql"
  production  = true
}

resource "vercel_project_domain" "graphql" {
  project_id = vercel_project.graphql.id
  domain     = "hieudoanm.vercel.app"
}
