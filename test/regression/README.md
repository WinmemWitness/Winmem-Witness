# Regression test data

- `golden-events/` contains canonical, stable event outputs.
- `golden-memories/` contains stable memory compression outputs.

CI can validate that changes to parsers/normalizers/LLM prompts do not break
canonical outputs without deliberate version bumps.

If you update a golden file:
- document why in the PR
- bump the relevant schema/prompt version
