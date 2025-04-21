#!/bin/bash

if [ $1 = "-h" -o $1 = "-help" -o $1 = "--h" -o $1 = "--help" ]; then
    echo ""
    echo "Como usar o script?"
    echo ""
    echo "Primeiro teste para ver se será criadas as tags corretamente"
    echo "Use o comando:"
    echo "              ./cria_tags.sh -t <nomeDasBranchs>"
    echo ""
    echo "Se tudo ocorrer bem, digite:"
    echo ""
    echo "              ./cria_tags.sh <nomeDasBranchs>"
    echo ""
    echo "Exemplo (várias branchs IdeasBD<matricula>CSU01):"
    echo "./cria_tags.sh Ide"
    echo "ou"
    echo "./cria_tags.sh Ideas"
    echo "ou"
    echo "./cria_tags.sh IdeasBD"
    echo ""
    echo "Após isso, se tudo ocorrer bem use o comando:"
    echo ""
    echo "              git push origin --tags"
    echo ""

else
    if [ $1 = "-t" ]; then
        echo "Realizando teste ..."

        x=0
        for brnch in $(git branch -r | grep 'origin/'$2 | sed 's/origin\///'); do
            echo $brnch
            x=$(expr $x + 1 )
        done
        echo ""
        echo "$x branchs serão afetadas"

    else
        echo "Trazendo do remoto para o local ..."
        git fetch 

        for brnch in $(git branch -r | grep 'origin/'$2 | sed 's/origin\///'); do
            echo $brnch
            git checkout -b $brnch origin/$brnch
        done

        echo "Criando tags ..."
        for brnch in $(git branch -r | grep 'origin/'$1 | sed 's/origin\///'); do
            echo $brnch
            git tag $brnch $brnch 
        done

        echo "Apagando Branchs locais criadas"
        for brnch in $(git branch -r | grep 'origin/'$1 | sed 's/origin\///'); do
            git branch -d $brnch
        done
        echo ""
        echo "se tudo ocorreu bem use o comando:"
        echo "          git push origin --tags"
    fi

fi

# se tudo ocorrer bem use o comando $ git push origin --tags
# ele vai enviar todas as tags q não foram enviadas