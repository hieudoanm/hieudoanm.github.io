# Modules and Configuration

## Root modules and child modules

A root module owns backend and provider configuration, environment wiring, and deployment boundaries. Child modules declare required providers and inputs, but should not configure credentials or remote state.

Keep modules cohesive around an independently understandable capability. Document inputs, outputs, assumptions, supported provider versions, and destructive behavior. Prefer composition over a large module with many mode flags.

## Inputs and outputs

Use accurate types, descriptions, and validation for public inputs. Avoid permissive `any` unless preserving a genuinely dynamic contract. Keep sensitive values marked, while recognizing Terraform can still persist them in state.

Expose only outputs callers need. Avoid outputting whole objects containing secrets or unstable provider internals.

## Dependencies

References between resources create dependency edges. Add `depends_on` only for hidden behavioral dependencies, such as a policy that must exist before an operation not represented by an attribute reference.

Use data sources to read externally managed resources. Make ownership explicit and avoid importing an object into multiple states.

## Module versions

Pin registry or VCS module sources to a reviewed version or immutable ref for production. Reusable modules should not embed environment-specific IDs, credentials, or backend settings.

## Official documentation

- [Module configuration](https://developer.hashicorp.com/terraform/language/modules/configuration)
- [Provider requirements](https://developer.hashicorp.com/terraform/language/providers/requirements)
