#!/bin/bash

# Briefing: Precisamos contar os commits de cada pessoa por sprint 
# estamos salvando em tags branchs que não são commitadas na main
# estamos usando o seguinte padrão para nomes de tags 
# Ideas<Matricula><tipo><cód. caso de uso>

# como usar: ./contacommits.sh CSU<numero2dígitos> <dataInicioSprint[ano-mes-dia]> <dataFimSprint[ano-mes-dia]>

# Primeiro parâmetro: código do caso de uso
# Exemplo: CSU01

# Segundo parametro: data do início da sprint 
# (necessário pegar alguns dias após a criação da branch 
#  para não pegar o ultimo commit da branch pai)
# Exemplo: 2024-11-04 

# Terceiro parâmetro: data de fim da sprint
# Exemplo: 2024-11-11
if [ $1 = "-h" -o $1 = "-help" -o $1 = "--h" -o $1 = "--help" ]
then
    echo ""
    echo "Como usar o script?"
    echo ""
    echo "Se certifique de ter seu repositório conforme o padrão (detalhes comentados no arquivo)"
    echo "./contacommits.sh CSU<numero2dígitos> <dataInicioSprint[ano-mes-dia]> <dataFimSprint[ano-mes-dia]>"
    echo ""
    echo "Exemplo:"
    echo "./contacommits.sh CSU01 2024-11-04  2024-11-11 "
else
    # carrega shortlog inicial (da main) para um arquivo txt 
    git shortlog -s -n  --since="$2" --until="$3" > ../commits.txt

    # separa o log da main e das tags por "/" 
    echo "/" >> ../commits.txt

    # coloca todas os commits das tags no arquivo txt
    # observe que estou colocando toda a lógica de cálculo 
    # para o script de python

    caso_de_uso=*$1 
    for tag in $(git tag -l $caso_de_uso); do
        git shortlog -s -n "$tag" --since=$2 --until=$3 >> ../commits.txt 
    done

    # executa o script
    python3 ./contacommits.py
fi