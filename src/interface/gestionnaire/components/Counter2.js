import React from 'react'
import '../css/counter.css'
import { FaTrashAlt,FaUserAlt } from "react-icons/fa";

export default function Counter() {
    const numbers = document.querySelectorAll(".number");
    numbers.forEach((num) => {
    const incrementCounter = () => {
    const target_number = +num.getAttribute("data-target-number");
    const current_number = parseInt(num.innerText);

    if (current_number < target_number) {
      num.innerText = Math.floor(current_number + target_number / 100);
      setTimeout(incrementCounter, 100);
    } else {
      num.innerText = target_number.toLocaleString();
    }
  };
  incrementCounter();
});
    
  return (
    <>
    <div className="container">
        <div className="card">
            <i className="fab fa-quora"></i>
            Nombre Bloc Poubelle
            <div className="number" data-target-number="12000">0</div>

        </div>
        <div className="card">
            <FaTrashAlt/>
            Nombre Total Poubelle
            <div className="number" data-target-number="12000">0</div>

        </div>
        <div className="card">
            <FaUserAlt/>
            Nombre personnes
            <div className="number" data-target-number="7500">0</div>
         </div>
    </div>
    <div className="container">
        <div className="card">
            <i className="fas fa-code"></i>
            Total Plastique collecté
            <div className="number" data-target-number="100000">0</div>
        </div>
        <div className="card">
            <i className="fas fa-check"></i>
            Total Papier collecté           
            <div className="number" data-target-number="100000">0</div>
        </div>
        <div className="card">
            <i className="fas fa-check"></i>
            Total Canette collecté
            <div className="number" data-target-number="12000">0</div>
        </div>
        <div className="card">
            <i className="fas fa-check"></i>
            <div className="number" data-target-number="12000">0</div>
                Total Composte collecté
        </div>
    </div>
    <div className="container">
        <div className="card">
            <i className="fas fa-code"></i>
            <div className="number" data-target-number="100000">0</div>
                nombre poubelle Plastique remplis
        </div>
        <div className="card">
            <i className="fas fa-check"></i>
            <div className="number" data-target-number="12000">0</div>
                nombre poubelle Papier remplis
        </div>
        <div className="card">
            <i className="fas fa-check"></i>
            <div className="number" data-target-number="12000">0</div>
            nombre poubelle Canette remplis
        </div>
        <div className="card">
            <i className="fas fa-check"></i>
            <div className="number" data-target-number="12000">0</div>
            nombre poubelle Composte remplis
        </div>
    </div>
    </>
  )
}