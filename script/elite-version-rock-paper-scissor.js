let scored = JSON.parse(localStorage.getItem('scored'))||{
        win : 0,
        loss : 0,
        tie : 0
      }


      updateScore();

      document.querySelector('body')
        .addEventListener('keydown',(event)=>{
          if(event.key === 'r'){
            play('rock');
          }else if(event.key === 'p'){
            play('paper');
          }else if(event.key === 's'){
            play('scissor');
          }
        })
      

      function pickComputerMove(){
        const randomNumber = Math.random();
        if (randomNumber < 1/3 ){
          return "rock";
        }else if (randomNumber < 2/3){
          return "paper";
        }else{
          return "scissor";
        }
      }


      function pickAutoMove(){
        let autoMove = '';
        const randomNumber = Math.random();
        if (randomNumber < 1/3 ){
          autoMove =  "rock";
        }else if (randomNumber < 2/3){
          autoMove = "paper";
        }else{
          autoMove = "scissor";
        }
        play(autoMove);
      }

      document.querySelector('body')
        .addEventListener('keydown',(event)=>{
          if(event.key == "a"){
            autoPlay();
          }else if( event.key === 'Backspace'){
             document.querySelector('.js-reset-conformation')
                .innerHTML = `are you sure you want to reset score? <button class="js-yes">Yes</button> <button class ="js-no">No</button>`;
              document.querySelector('.js-yes')
                .addEventListener('click',()=>{
                  reset();
              document.querySelector('.js-reset-conformation')
                  .innerHTML = '';
          });
            document.querySelector('.js-no')
              .addEventListener('click',()=>{
                document.querySelector('.js-reset-conformation')
                  .innerHTML = '';
              })
        }
        });

      document.querySelector('.js-auto-play')
        .addEventListener('click',()=>{
          autoPlay();
        })
      let autoPlaying = false;
      let intervalId;
      function autoPlay(){
        if(!autoPlaying){
          intervalId = setInterval(pickAutoMove,1000);
          autoPlaying = true;
          document.querySelector('.js-auto-play')
            .innerText = "Stop Playing"
          
        }else{
          clearInterval(intervalId);
          autoPlaying = false;
          document.querySelector('.js-auto-play')
            .innerHTML = "Auto Play"
        }
        
      }

      document.querySelector('.js-rock-move')
        .addEventListener('click', ()=>{
          play('rock');
        });


           document.querySelector('.js-paper-move')
        .addEventListener('click', ()=>{
          play('paper');
        });

           document.querySelector('.js-scissor-move')
        .addEventListener('click', ()=>{
          play('scissor');
        });

      function play(choice){
        const computerMove = pickComputerMove();
        let result = check(choice,computerMove);

        if (result == "win"){
          scored.win += 1;
        } else if (result == "loss"){
          scored.loss +=1 ;
        } else {
          scored.tie +=1;
        }
        localStorage.setItem('scored',JSON.stringify(scored));
        updateScore();
        Move(choice,computerMove);
        Result(result);
      }
      const playMove = {
        rock: "scissor",
        paper : "rock",
        scissor: "paper"
      }

      function check(Move,computerMove){
        if (Move === computerMove){return "tie"}
        if (playMove[Move]=== computerMove){return "win"}
        else{ return "loss"}        
      }
      
      document.querySelector('.js-reset')
        .addEventListener('click',()=>{
          document.querySelector('.js-reset-conformation')
            .innerHTML = `are you sure you want to reset score? <button class="js-yes">Yes</button> <button class ="js-no">No</button>`;
          document.querySelector('.js-yes')
            .addEventListener('click',()=>{
              reset();
            document.querySelector('.js-reset-conformation')
              .innerHTML = '';
        })

          document.querySelector('.js-no')
            .addEventListener('click',()=>{
              document.querySelector('.js-reset-conformation')
                .innerHTML = '';
        })
          
        })

      
      function reset(){
        scored = {
          win : 0,
          loss : 0,
          tie : 0
        }
        localStorage.removeItem('scored');
        updateScore();
        
      }


      function updateScore(){
        document.querySelector('.js-score')
        .innerHTML= ` win : ${scored.win}  Loss : ${scored.loss}  Tie : ${scored.tie}`;
      }

      function Move(choice,computerMove){
        document.querySelector('.js-Move')
          .innerHTML = `You : <img src = "images/${choice}-emoji.png" class = "Move-icon">Computer : <img src = "images/${computerMove}-emoji.png" class = "Move-icon">`;
      }


      function Result(result){
        document.querySelector('.js-result')
          .innerHTML = `You ${result}`;
      }