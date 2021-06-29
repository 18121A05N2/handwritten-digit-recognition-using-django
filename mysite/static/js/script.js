let x=0,y=0;
            let canvas = document.getElementById('myCanvas')
            let but = document.getElementById('predict')
            var context = canvas.getContext("2d");
            let clear = document.getElementById("clear")
            let target = document.getElementById("target")
            let arr = new Array(28);
            for (var i = 0; i < 28; i++) {
                arr[i] = new Array(28).fill(0);
            }
            let isDrawing = false;
            clear.addEventListener('click',(e)=>{
                e.preventDefault()
                context.clearRect(0, 0, canvas.width, canvas.height);
                for(let i=0;i<28;i++)
                {
                    for(let j=0;j<28;j++)
                    {
                        arr[i][j]=0;
                    }
                }
            })
            function createRoundBarblock(y){
                let ele = document.createElement('div')
                ele.style.width = y.toString()+'%';
                ele.style.height = '100%';
                ele.style.backgroundColor = '#44FB00';
                ele.style.animation = 'example 2s'
                return ele
            }
            function createRoundBar(y){
                let ele = document.createElement('div')
                ele.className='roundbar'
                ele.append(createRoundBarblock(y))
                return ele
            }
            function createBar(x,y){
                let child = document.createElement('div')
                child.className='bar'
                child.innerHTML = x
                child.append(createRoundBar(y))
                return child
            }
            but.addEventListener('click',async (e)=>{
                target.innerHTML='<div class="ui active inverted dimmer"><div class="ui large text loader">Please  wait <br> predicting...</div></div> '
                e.preventDefault()
                console.log("ok")
                let res =await fetch('project1/predict',{
                    method:'POST',
                    headers :{
                        "content-type" : "application/json"
                    },
                    body:JSON.stringify({
                        data: arr
                    })
                })
                let ele = document.createElement('div')
                ele.className='percontainer'
                let data=await res.json()
                for(let x in data){
                    
                        let child = createBar(x,data[x])
                        ele.append(child)
                }
                target.innerHTML = ''
                target.append(ele)
            })
            canvas.addEventListener('mousedown', e => {
                x = parseInt(e.offsetX/8);
                y = parseInt(e.offsetY/8);

                isDrawing = true;
            });
            window.addEventListener('mouseup',e=>{
                isDrawing = false;
            })
            function max(a,b){
                if(a>b)
                return a
                return b
            }
            canvas.addEventListener('mousemove', e => {
                if (isDrawing === true) {
                    if(parseInt(e.offsetX/8)!=x || parseInt(e.offsetY/8)!=y){
                        arr[y][x]=1;
                        arr[y+1][x+1]=max(0.5,arr[y+1][x+1])
                        arr[y-1][x-1]=max(0.5,arr[y-1][x-1])
                        arr[y-1][x+1]=max(0.5,arr[y-1][x+1])
                        arr[y+1][x-1]=max(0.5,arr[y+1][x-1])
                        arr[y+1][x]=max(0.5,arr[y+1][x])
                        arr[y-1][x]=max(0.5,arr[y-1][x])
                        arr[y][x+1]=max(0.5,arr[y][x+1])
                        arr[y][x-1]=max(0.5,arr[y][x-1])

                        x = parseInt(e.offsetX/8);
                        y = parseInt(e.offsetY/8);
                        context.beginPath()
                        context.fillRect(x*8-8,y*8-8,8,8)
                    }
                }
            }); 