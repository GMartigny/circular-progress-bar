workflow "New workflow" {
  on = "push"
  resolves = ["Deploy to ZEIT"]
}

action "npm install" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "npm test" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "test"
  needs = ["npm install"]
}

action "Filter tags only" {
  uses = "actions/bin/filter@3c0b4f0e63ea54ea5df2914b4fabf383368cd0da"
  needs = ["npm test"]
  args = "tag"
}

action "Deploy to ZEIT" {
  uses = "actions/zeit-now@5c51b26db987d15a0133e4c760924896b4f1512f"
  needs = ["Filter tags only"]
  args = "--target production"
  secrets = ["ZEIT_TOKEN"]
}
