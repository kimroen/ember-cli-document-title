module.exports = {
  scenarios: [
    {
      name: 'ember-1.10',
      dependencies: {
        "ember": "~1.10.0"
      }
    },
    {
      name: 'ember-1.11',
      dependencies: {
        "ember": "~1.11.0"
      }
    },
    {
      name: 'ember-release',
      dependencies: {
        "ember": "release"
      },
      resolutions: {
        "ember": "release"
      }
    },
    {
      name: 'ember-beta',
      dependencies: {
        "ember": "beta"
      },
      resolutions: {
        "ember": "beta"
      }
    },
    {
      name: 'ember-canary',
      dependencies: {
        "ember": "canary"
      },
      resolutions: {
        "ember": "canary"
      }
    }
  ]
};
