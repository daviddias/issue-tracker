Issue-Tracker
=============

This is a command-line tool to keep track of all the issues in a github project (made for github.com/joyent/node in mind)

## features aka commands

```bash
trckr update
trckr fullupdate
trckr new                               # tell me what issues are 'new'
trckr pipeline <issueNumber> <state>    # alias to pipeline should be pl
trckr pipeline <issueNumber> next       # alias to pipeline should be pl
trckr review                            # tell me the issues that I don't review for more than the 'threshold' number of days
```

### Issue object model

```javascript
{
  id: "string", // id of the issue
  assigned: ["a","b"..], // who is responsible to check it out
  lastReviewed: , //
  state: , //
  url: , //
}
```

