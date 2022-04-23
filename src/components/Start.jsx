import React from "react";

function Start (props) {
    return (
        <section className="quiz--container">
            <h2>Quiz!</h2>
            <p>Start a New Game</p>
            <div className="options">
                <label htmlFor="game-options">Choose a difficulty:</label>
                <select 
                    defaultValue={'DEFAULT'}
                    className="game-options"
                    value={props.level}
                    onChange={props.handleChange}
                    name="level"
                >
                    <option value="DEFAULT" disabled>Any difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <label htmlFor="game-options">Number of Questions:</label>
                <input
                    type="number"
                    className="game-input"
                    placeholder="10"
                    onChange={props.handleChange}
                    name="number"
                    value={props.number}
                    min="1"
                    max="15"
                />
            </div>
        </section>
    )
}

export default Start