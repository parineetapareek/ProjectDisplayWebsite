import React from 'react';

function Cards({ item }) {
    return (<>
        <div className="mt-4 my-3 p-3">
            <div className="card w-75 bg-base-100 shadow-xl hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
                <figure>
                    <img src={item.image} alt="Project" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {item.projectName}
                        <div className="badge badge-secondary">{item.category}</div>
                    </h2>
                    <p>{item.branch}</p>
                    <div className="card-actions justify-between">
                        <div className="badge badge-outline">{item.difficulty}</div>
                        <div className="badge badge-outline"><a href='userproject'>View More</a></div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Cards;