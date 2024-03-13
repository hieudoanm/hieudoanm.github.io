terraform {
  required_providers {
    vercel = {
      source = "vercel/vercel"
      version = "1.3.0"
    }
  }
}

resource "vercel_project" "sunil" {
  name      = "sunil"
  framework = "nextjs"
  git_repository = {
    type = "github"
    repo = "hieudoanm/hieudoanm.github.io"
  }
}

data "vercel_project_directory" "sunil" {
  path = "app/sunil"
}

resource "vercel_deployment" "sunil" {
  project_id  = vercel_project.sunil.id
  files       = data.vercel_project_directory.sunil.files
  path_prefix = "app/sunil"
  production  = true
}

resource "vercel_project_domain" "sunil" {
  project_id = vercel_project.sunil.id
  domain     = "hieudoanmini.vercel.app"
}
