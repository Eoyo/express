// w.terminate();  //结束worker
function initWorker(str) {
    var job = {
        callbacks: []
        , id: 0
        , worker: null
        , send(str, cb) {
            job.worker.postMessage({
                input: str
                , compute: "text"
                , id: this.id
            });
            this.callbacks.push(cb);
            this.id++;
            if (this.id > 3000) {
                this.id = 0
            }
        }
        , dispatchMes(data) {
            var cb = this.callbacks[data.id];
            if (typeof cb === "function") {
                return cb(data);
            }
        }
        , init(str) {
            job.worker = new Worker(str)
            job.worker.onmessage = function (e) {
                job.dispatchMes(e.data)
            }
        }
    }
    job.init(str);
    return job;
}

// var doj = initWorker("./compute.js")

var getInput = document.getElementById("getInput");
var use = Vir({
    "input": {
        on: {
            keydown: {
                "enter"(e) {
                    ajax({
                        type: "GET"
                        , url: "http://localhost:3000/compute"
                        , data: {
                            input: this.value
                        }
                        , success(data) {
                            console.log(data);
                            use.show.innerHTML = data.output
                        }
                    })
                    // doj.send(this.value, function (data) {
                    //     use.show.innerHTML = data.output;
                    // })
                }
            }
        }
    }
    , "#show.output ::show": {

    }
})

