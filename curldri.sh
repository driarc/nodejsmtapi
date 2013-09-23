#!/bin/sh
curl -X PUT -H "content-type: application/json"  http://localhost:3000/executethis --data '[{"ExecuteThis":"extractthis","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello"}]';
