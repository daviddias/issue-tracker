Issue-Tracker
=============

This is a command-line tool to keep track of all the issues in a github project (made for github.com/joyent/node in mind)

## features aka commands

- [ ] `trckr update` - fetch all the issues, update the database and close the ones needed to be close
- [ ] `trckr list -n<number> [<state>]`  - list all/number of open issues in a determined <state> 
- [ ] `trckr open <issueNumber>`
- [ ] `trckr state <issueNumber> <state>`  - change the state of an issue

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

