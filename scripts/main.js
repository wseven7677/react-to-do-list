// console.log("main.js is ok.");

require(["scripts/dataImport"],function(dataImport){

    var existTasks = [],
        tasksAll = [];// 存放带格式的items的数组，全局。


// 回车键提交任务：
    document.addEventListener("keypress",function(event){
        if(event.keyCode == 13){
            document.getElementById("subBtn").click();
            document.getElementById("theInput").value = "";
        }
    });

// --------------------react start------------------------------------
// 每一个条目 【组件】
    var TaskItem = React.createClass({

        saveStateToStorage: function(){
            var exTasks = JSON.parse(localStorage.getItem("todoTasks")),
                that = this;
            exTasks.forEach(function(value,index){
                if(value.content == that.props.inputText){
                    value.state = ! value.state;
                }
            });
            localStorage.setItem("todoTasks",JSON.stringify(exTasks));
        },

        getInitialState: function(){

            if(this.props.doneState == false){
               return {
                    checked: false,
                    styleObj: {
                        'color': '#000',
                        'text-decoration': 'none'
                    }
                };
            }else{
                return {
                    checked: true,
                    styleObj: {
                        'color': '#888',
                        'text-decoration': 'line-through'
                    }
                };
            }

        },

        handleClick: function(){

            if(this.state.checked == false){
                this.setState({
                    checked: true,
                    styleObj: {
                        'color': '#888',
                        'text-decoration': 'line-through'
                    }
                });
            }else{
                this.setState({
                    checked: false,
                    styleObj: {
                        'color': '#000',
                        'text-decoration': 'none'
                    }
                });
            }
            this.saveStateToStorage();
        },

        render: function(){

            return <div className='item'>
                <input checked={this.state.checked} className='cb' type='checkbox' onClick={this.handleClick}></input>
                <span style={this.state.styleObj} className='cbTxt'>{this.props.inputText}</span>
            </div>;
        }
    });
// 所有条目的集群 【组件】
    var TaskShow = React.createClass({

        render: function(){         

            var inputContt = this.props.inputContent;

            return <div className='itemOutter'>
                {inputContt}
            </div>;
        }
    });
// 总控制+条目输入 【总负责 组件】
    var TaskInCtrl = React.createClass({

        getInitialState: function(){

        // 初始化时加载localstorage中的tasks：
            var oTasksString;
            if(localStorage.getItem("todoTasks") != null){
                oTasksString = localStorage.getItem("todoTasks");
                existTasks = JSON.parse(oTasksString);

                existTasks.forEach(function(value,index){
                    tasksAll.push(<TaskItem doneState={value.state} inputText={value.content} />);
                });
            }

            return {
                taskNum: 0
            };
        },
    // 点击提交后的处理函数：
        handleClick: function(){
            var theInput = document.getElementById("theInput"),
                taskForStorage = {},
                tasksInStorage = [];
        // 用于展示：
            tasksAll.push(<TaskItem doneState={false} inputText={theInput.value} />);

        // 用于localstorage存储：
            taskForStorage = {
                content: theInput.value,
                state: false
            };
            if(localStorage.getItem("todoTasks") != null){
                tasksInStorage = JSON.parse(localStorage.getItem("todoTasks"));
            }
            tasksInStorage.push(taskForStorage);
            localStorage.setItem("todoTasks",JSON.stringify(tasksInStorage));

        // 用于重新渲染：
            this.setState({
                taskNum: tasksAll.length
            });
        },

        render: function(){

            return <div>
                <input id='theInput' type='text' placeholder='在此处输入任务'></input>
                <button id='subBtn' onClick={this.handleClick}>提交</button>

                <TaskShow inputContent={tasksAll} />
            </div>;
        }
    });
    

    ReactDOM.render(
        <TaskInCtrl />,
        document.getElementById("outter")
    );
// ------------------------react end------------------------------------

});