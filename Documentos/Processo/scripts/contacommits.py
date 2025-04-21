import sys

commits = dict()
calouros = list(["GuilhermePianetti", "amandacmelo", "nunesfnj", "ManoelCosta0", 
            "cristinaleticia", "aykOwO", "GofArzy", "DalmoRainer", "melissaalanis", 
            "caioomenezes", "PedroElecio"]) 

def init():
    
    # para controlar se é comits da main ou tags, "/" separa
    main = True
    with open('../commits.txt', 'r') as arquivo:

        for linha in arquivo:

            if linha[0]!='/' and main:
                linha = linha.strip()
                linha = linha.split('\t')
                if linha[0] not in calouros:
                    commits[linha[1]] = int(linha[0])

            elif linha[0] == "/": # a partir daqui são comits das tags
                main = False
                continue

            else:
                linha = linha.strip()
                linha = linha.split('\t')

                # soma commits de branchs diferentes
                if linha[1] in list(commits.keys()):  # TODO tirar a criação dessa lista do loop
                    commits[linha[1]] = commits[linha[1]] + int(linha[0])
                
                # cria chave se não possúi
                else: commits[linha[1]] = int(linha[0])
                
def exibir():
    with open('../commits.txt', 'w') as arquivo:
        for key, value in commits.items():
            string = key + " " + str(value) + '\n'  
            arquivo.write(string)

init()
exibir()


