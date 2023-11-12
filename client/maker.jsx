const helper = require('./helper.js');
const React = require('react');
const ReactDOM = require('react-dom');

/* Add our React components for our Domo app */
const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const job = e.target.querySelector('#domoJob').value;

    if (!name || !age || !job) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, age, job}, loadDomosFromServer);

    return false;
};

/* Create a functional component to create our Add Domo form.
    Similar to the signup and login forms. */
const DomoForm = (props) => {
    return (
        <form id="domoForm" 
            onSubmit={handleDomo} 
            name="domoForm" 
            action="/maker" 
            method="POST" 
            className="domoForm"
        >
            <label htmlFor="name">Name:</label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
            <label htmlFor="age">Age:</label>
            <input id="domoAge" type="number" min="0" name="age"/>
            <label htmlFor="job">Job:</label>
            <input id="domoJob" type="text" name="job" placeholder="Domo Job"/>
            <input className="makeDomoSubmit" type="submit" value="Make Domo"/>
        </form>
    );
};

/* Create a component to display the list of Domos */
const DomoList = (props) => {
    if (props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        return (
            <div key={domo._id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName"> Name: {domo.name} </h3>
                <h3 className="domoAge"> Age: {domo.age} </h3>
                <h3 className="domoJob"> Job: {domo.job} </h3>
                {/* <h3 className="domoJob"> Job: {domo.job} </h3> */}
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

/* Load the list of domos from the server.
    When it gets a new list back, it should rerender the domoList component
    so that it is up to date with the data. */
const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();
    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.getElementById('domos')
    );
};

/* Render the DomoForm and DomoList components, 
    and have the client request the list of domos from the server. */
const init = () => {
    ReactDOM.render(
        <DomoForm />,
        document.getElementById('makeDomo')
    );

    ReactDOM.render(
        <DomoList domos={[]} />,
        document.getElementById('domos')
    );

    loadDomosFromServer();
};

window.onload = init;
