terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "1.0.0"
    }
  }
}

resource "vercel_project" "broca" {
  name      = "broca"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "hieudoanm/hieudoanm.github.io"
  }
}

data "vercel_project_directory" "broca" {
  path = "app/broca"
}

resource "vercel_deployment" "broca" {
  project_id  = vercel_project.broca.id
  files       = data.vercel_project_directory.broca.files
  path_prefix = "app/broca"
  production  = true
}

resource "vercel_project_domain" "broca" {
  project_id = vercel_project.broca.id
  domain     = "broca.vercel.app"
}
