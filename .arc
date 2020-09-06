@app
begin-app

@http
get /
get /clear-questions
get /delete
get /questions
post /ask

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
