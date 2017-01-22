# Promises in AngularJs

Many promises can be made to execute in parallel using the approach <strong>$q.all[..., ...].then(function(){ ...... }).catch(function(error){......})</strong>
<br>
Main advantage is that: if a promise fails, it will cancel the execution of another promises. Thus, it saves time. It is more efficient.