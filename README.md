# Decathlon Angular

Empresa: MarketData

Aplicação Angular desenvolvida como teste técnico para vaga de Front-end.

O sistema processa os resultados das 10 modalidades do Decathlon Olímpico, calcula a pontuação de cada atleta e exibe uma classificação geral, com suporte a empates e exportação dos dados em CSV.

---

## Sobre o desafio

A aplicação lê dois arquivos JSON de entrada:
- `resultados.json`: pontuações brutas dos atletas em cada uma das 10 modalidades
- `sistema_pontuacao.json`: constantes (A, B, C) usadas no cálculo de pontos de cada modalidade

A pontuação de cada prova é calculada com as fórmulas oficiais do Decathlon:

- **Provas de pista** (tempo menor = melhor): `Points = INT(A(B - P)^C)`
- **Provas de campo** (distância/altura maior = melhor): `Points = INT(A(P - B)^C)`

Os atletas são então ordenados de forma decrescente pela pontuação total, e em caso de empate, dividem a mesma posição (ex: 3º-4º lugar).

---

## Funcionalidades

- Listagem de todos os atletas com pontuação total e posição final
- Tratamento de empates na classificação
- Exportação da tabela de resultados em CSV
- Tela "Sobre mim" com foto, experiências e habilidades
- Menu de navegação entre as telas
- Layout responsivo

---

## Tecnologias

- Angular 14+
- PrimeNG
- TypeScript
- CSS
- Node.js 14.17.x+

---

## Como rodar o projeto

\`\`\`bash
# Clone o repositório
git clone https://github.com/[Isabela01vSilva]/decathlon.git

# Entre na pasta do projeto
cd decathlon-angular

# Instale as dependências
npm install

# Rode a aplicação
ng serve
\`\`\`

Acesse em `http://localhost:4200`
