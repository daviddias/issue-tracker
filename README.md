Issue-Tracker
=============

This is a command-line tool to keep track of all the issues in a github project (made with github.com/joyent/node in mind)

## you can use it today :)

Get the repo
```bash
$ git clone git@github.com:diasdavid/issue-tracker.git
```

Link it
```bash
cd issue-tracker
npm link
```

Set it up
```bash
$ trckr set repo <username>/<repo> # e.g diasdavid/issue-tracker
$ trckr set secret <useragent> <accesstoken> # e.g diasdavid SASDASDASDSDA.. , chck out to get yours at https://github.com/blog/1509-personal-api-tokens
```

You are ready to go :)


## features aka commands (MVP 0.1)

```bash
trckr fullupdate
```

```bash
trckr new                               # tell me what issues are 'new'
```

```bash
trckr review                            # tell me the issues that I don't 
```

```bash
trckr pipeline <issueNumber> <state>    # alias to pipeline should be pl
```

```bash
trckr pipeline <issueNumber> next       # alias to pipeline should be plreview for more than the 'threshold' number of days
```

```bash
trckr set pipeline new,a,b,c,d,e,close
```

```bash
trckt set repo <user>/<reponame>

```
trckr set secret <useragent> <accesstoken>
```

### Issue object model example

```javascript
 { type: 'Issue',
  _saved: true,
  isValid: [Function],
  save: [Function],
  updateProperties: [Function],
  updateAttributes: [Function],
  toJSON: [Function],
  toData: [Function],
  toObj: [Function],
  toString: [Function],
  _getAssociation: [Function],
  _createAssociation: [Function],
  _removeAssociation: [Function],
  _commitAssociationChanges: [Function],
  clone: [Function],
  _events: {},
  createdAt: Sun Jan 19 2014 16:38:33 GMT+0000 (WET),
  updatedAt: undefined,
  url: 'https://api.github.com/repos/diasdavid/issue-tracker/issues/2',
  htmlUrl: 'https://github.com/diasdavid/issue-tracker/issues/2',
  number: 2,
  state: 'open',
  title: 'switch issue model to camelCase',
  body: '`model` enforces camelCase, everything that is not camelCase is not well saved, I have to monkey patch the name of the fields that come down from the fetch issue',
  user:
   { login: 'diasdavid',
     id: 1211152,
     avatar_url: 'https://gravatar.com/avatar/0b2bf11db649b4901d41510c3b48ea55?d=https%3A%2F%2Fidenticons.github.com%2F09cb9c649a616a349a327f97736c0b6d.png&r=x',
     gravatar_id: '0b2bf11db649b4901d41510c3b48ea55',
     url: 'https://api.github.com/users/diasdavid',
     html_url: 'https://github.com/diasdavid',
     followers_url: 'https://api.github.com/users/diasdavid/followers',
     following_url: 'https://api.github.com/users/diasdavid/following{/other_user}',
     gists_url: 'https://api.github.com/users/diasdavid/gists{/gist_id}',
     starred_url: 'https://api.github.com/users/diasdavid/starred{/owner}{/repo}',
     subscriptions_url: 'https://api.github.com/users/diasdavid/subscriptions',
     organizations_url: 'https://api.github.com/users/diasdavid/orgs',
     repos_url: 'https://api.github.com/users/diasdavid/repos',
     events_url: 'https://api.github.com/users/diasdavid/events{/privacy}',
     received_events_url: 'https://api.github.com/users/diasdavid/received_events',
     type: 'User',
     site_admin: false },
  labels:
   [ { url: 'https://api.github.com/repos/diasdavid/issue-tracker/labels/bug',
       name: 'bug',
       color: 'fc2929' } ],
  assignee: null,
  milestone: null,
  comments: 0,
  pullRequest: { html_url: null, diff_url: null, patch_url: null },
  closedAt: null,
  trckrState: 'new',
  trckrLastReview: null,
  trckrPingback: null,
  id: '466565B5-8D91-4B9E-A2F9-4194F6AC62AF' }
```

