module.exports = {
  apps : [{
    name: "cosmos-management",
    script: "npm",
    args: "start",
    watch: true,
    env: {
      "NODE_ENV": "production"
    }
  }]
}