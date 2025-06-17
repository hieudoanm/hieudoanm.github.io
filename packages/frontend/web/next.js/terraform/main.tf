terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "3.5.2"
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}

variable "vercel_api_token" {}

resource "vercel_project" "nothing" {
  name       = "nothing"
  framework  = "nextjs"
  git_repository = {
    type = "hieudoanm"
    repo = "nothing"
  }
}

data "vercel_project_directory" "nothing_directory" {
  path = "packages/frontend/web"
}

resource "vercel_deployment" "nothing_deployment" {
  project_id = vercel_project.nothing.id
  files = data.vercel_project_directory.nothing_directory.files
  path_prefix = "."
  production  = true
}

resource "vercel_project_domain" "nothing_domain" {
  project_id = vercel_project.nothing.id
  domain     = "nothing.vercel.app"
}
