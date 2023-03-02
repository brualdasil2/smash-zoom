# Smash Zoom

Jogo para adivinhar o personagem de Smash Bros que está na imagem com zoom.
Front-End responsivo desenvolvido com React JS e Material UI.
Back-End desenvolvido com Flask, SocketIO e MongoDB.

## Modo single player

É sorteado um personagem, e ao dar play, uma animação de zoom-out inicia. Quanto antes adivinhar o personagem, mais pontos ganha.

![image](https://user-images.githubusercontent.com/73000207/222514003-6f4277b9-8f1a-4e9a-9922-8e3a1e3baeab.png)
![image](https://user-images.githubusercontent.com/73000207/222514048-728021f4-80fc-48c8-8c5b-9d0089223a30.png)

## Modo multi player

Um jogador cria uma sala, e compartilha o código para os outros entrarem. Quando todos estão prontos, a partida começa. A cada rodada, todos os jogadores recebem a mesma imagem de personagem com zoom, e devem tentar adivinhar fazendo o máximo de pontos. Após a última rodada, quem tiver a maior quantidade de pontos é o vencedor.

![image](https://user-images.githubusercontent.com/73000207/222514157-2539fae4-fd33-43e9-ab7b-84e507d3ef60.png)
![image](https://user-images.githubusercontent.com/73000207/222514201-183d09d9-a95b-4837-a851-ea99a985399c.png)
