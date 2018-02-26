# Bench Report Spec

## Data Structure & File Format

Bench reports are required to be sent as [`JSON`][json] format in `UTF-8` encoding

Summary of Bench object types:

- [report.json](#reportjson)
  - [commit](#commit)
  - [environments](#environments)
  - [jobs](#jobs)
  - [results](#result)

---

## `report.json`

```json
{
  "version": "1.0.0",
  "commit": {},
  "environments": [],
  "jobs": [],
  "results": {}
}
```

name             | type     | required | default | description                                
---------------- | -------- | -------- | ------- | -------------------------------------------
**version**      | `String` | ✔        | `-`     | Spec version. Format must follow [semver][]
**commit**       | `Object` | ✔        | `-`     | [`Commit`](#commit) Object                 
**environments** | `Array`  | ✔        | `-`     | Array of [`Environment`](#Environment) Objects       
**jobs**         | `Array`  | ✔        | `-`     | Array of [`Job`](#job) Objects                      
**results**      | `Array`  | ✔        | `-`     | Array of [`Result`](#result) Objects                 

### Commit

Information about the code commit that representes this report

```json
{
  "commit": {
    "id": "7cd9055",
    "time": "2018-02-26T00:52:01.158Z"
  }
}
```

name     | type     | required | default | description                           
-------- | -------- | -------- | ------- | --------------------------------------
**id**   | `String` | ✔        | `-`     | unique identifier of commit           
**time** | `String` | ✔        | `-`     | Date & Time of commit _([RFC 3339][])_

### Environment

> See [Environments Schema][schema-environments] for details

```json
{
  "environments": [
    {
      "name": "ubuntu:16.04",
      "os": {
        "name": "ubuntu",
        "version": "16.04"
      }
    }
  ]
}
```

### Job

> See [Bench Schema][schema-bench] for details

```json
{
  "jobs": [
    {
      "name": "performance",
      "benchmark": "node bench/performance.js"
    }
  ]
}
```

### Result

```json
{
  "results": [
    {
      "job": "performance",
      "environment": "ubuntu:16.04",
      "operations": 10,
      "timings": {
        "elapsed": 20000,
        "period": 200,
        "time": 200
      }
    }
  ]
}
```

name            | type      | required | default | description                                            
--------------- | --------- | -------- | ------- | -------------------------------------------------------
**job**         | `String`  | ✔        | `-`     | Job name, _(see [`Job`](#job))_                        
**environment** | `String`  | ✔        | `-`     | Environment name, _(see [`Environment`](#environment))_
**operations**  | `Integer` | ✔        | `-`     | Number of successful operations executed               
**timings**     | `Object`  | ✔        | `-`     | [`Timings`](#timings) Object                           

#### Timings

name        | type      | required | default | description                                               
----------- | --------- | -------- | ------- | ----------------------------------------------------------
**elapsed** | `Integer` | ✔        | `-`     | A timestamp of when the benchmark started _(milliseconds)_
**period**  | `Integer` | ✔        | `-`     | The time taken to complete the benchmark _(milliseconds)_ 
**time**    | `Integer` | ✖        | `-`     | The time taken to execute the test once _(milliseconds)_  

---

###### Example Payload

> ```json
> {
>   "version": "1.0.0",
>   "commit": {
>     "id": "7cd9055",
>     "time": "2018-02-26T00:52:01.158Z"
>   },
>   "environments": [
>     {
>       "name": "ubuntu:16.04",
>       "os": {
>         "name": "ubuntu",
>         "version": "16.04"
>       }
>     }
>   ],
>   "jobs": [
>     {
>       "name": "performance",
>       "benchmark": "node bench/performance.js"
>     }
>   ],
>   "results": [
>     {
>       "job": "performance",
>       "environment": "ubuntu:16.04",
>       "operations": 10,
>       "timings": {
>         "elapsed": 20000,
>         "period": 200,
>         "time": 200
>       }
>     }
>   ]
> }
> ```

[json]: https://www.json.org/
[semver]: https://semver.org
[rfc 3339]: https://tools.ietf.org/html/rfc3339
[schema-bench]: https://github.com/benchci/schema-bench
[schema-environments]: https://github.com/benchci/schema-environments
