import React, { useState, useEffect } from "react";

export default function App() {
    // todoリスト
    const [todoText, setTodoText] = useState("");
    const [todoList, setNewTodoList] = useState([]);
    const [filteredTodoList, setFilteredTodoList] = useState([]);
    const [radio, setRadio] = useState('all');

    const [message, setMessage] = useState('');

    // radioボタン更新
    const handleChange = (event) => {
        setRadio(event.target.value);
        if (event.target.value === 'running') {
            const runningTodoList = [...todoList].filter((todo) => todo.status === "実行中");
            setFilteredTodoList(runningTodoList);
        } else if (event.target.value === 'complete') {
            const completeTodoList = [...todoList].filter((todo) => todo.status === "完了");
            setFilteredTodoList(completeTodoList);
        } else if (event.target.value === 'unexecuted') {
            const unexecutedTodoList = [...todoList].filter((todo) => todo.status === "未実行");
            setFilteredTodoList(unexecutedTodoList);
        }
        return;
    };

    // statusの切り替え
    const onClickSwitch = (index) => {
        const switchTodoList =[...todoList];
        if (switchTodoList[index].status === "実行中") {
            switchTodoList[index].status = "完了";
        } else if (switchTodoList[index].status === "完了"){
            switchTodoList[index].status = "未実行";
        } else if (switchTodoList[index].status === "未実行") {
            switchTodoList[index].status = "実行中";
        }
        setNewTodoList(switchTodoList);
    };

    // 削除する
    const onClickDelete = (index) => {
        const deletedTodoList = [...todoList];
        deletedTodoList.splice(index, 1);
        setNewTodoList(deletedTodoList);
    };

    // インプットフォームの状態を管理
    const onChangeTodoText = (event) => {
        setTodoText(event.target.value);
    };

    // 追加ボタンを押すとタスクがToDoリストに追加される
    const onClickAdd = () => {
        if(todoText === "") return;
        const newTodo = {
            id: 0,
            comment: todoText,
            status: "未実行"
        };

        // DOMが更新される
        todoList.push(newTodo);

        // 入力フォーム内を"""にする
        setTodoText("");
    };

    useEffect(() => {
        // fetchでバックエンドExpressのサーバを指定
        fetch('/api')
            // レスポンスをjsonとして受け取り、jsオブジェクトを生成
            .then((res) => res.json())
            // 生成したjsオブジェクトをdataに代入
            // data.messageで取り出したデータをuseStateに保存
            .then((data) => setMessage(data.message));
    }, []);

    return (
        <>
            <div className="complete-area">
                <label>
                    <input type="radio" value="all" onChange={ handleChange } checked={ radio === 'all' } />
                    全て
                </label>

                <label>
                    <input type="radio" value="unexecuted" onChange={ handleChange } checked={ radio === 'unexecuted' } />
                    未実行
                </label>

                <label>
                    <input type="radio" value="running" onChange={ handleChange } checked={ radio === 'running' } />
                    実行中
                </label>

                <label>
                    <input type="radio" value="complete" onChange={ handleChange } checked={ radio === 'complete' } />
                    完了
                </label>

                <h1>ToDoリスト</h1>
                <table>
                    <thead>
                        <tr>
                            <td>index</td>
                            <td>ID</td>
                            <td>コメント</td>
                            <td>状態</td>
                        </tr>
                    </thead>
                    {
                        radio === 'all'?
                        <tbody id="todo-body">
                            { todoList.map((todo, index) => (
                                <tr>
                                    <td>{ index }</td>
                                    <td>{ todo.id }</td>
                                    <td>{ todo.comment }</td>
                                    <td><button onClick={ () => onClickSwitch(index) }>{ todo.status }</button></td>
                                    <td><button onClick={ () => onClickDelete(index) }>削除</button></td>
                                </tr>
                            )) }
                        </tbody>
                        :
                        <tbody id="todo-body">
                            { filteredTodoList.map((todo, index) => (
                                <tr>
                                    <td>{ index }</td>
                                    <td>{ todo.comment }</td>
                                    <td><button onClick={ () => onClickSwitch(index) }>{ todo.status }</button></td>
                                    <td><button onClick={ () => onClickDelete(index) }>削除</button></td>
                                </tr>
                            )) }
                        </tbody>
                    }
                </table>
            </div>
            <h2>新規タスクの追加</h2>
            <div className="add-todo">
                <input value={ todoText } onChange={ onChangeTodoText } />
                <button onClick={ onClickAdd }>追加</button>
            </div>
            <div className="front-end">
                <p>front-end</p>
                <p>{ message.comment }</p>
            </div>
        </>
    );
}
