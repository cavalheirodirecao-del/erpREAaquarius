# Inventário do Aquarius legado

Status: inventário estático inicial, consolidado em 22/10/2026.

## Fonte e limites

- Fonte principal: strings ASCII e consultas SQL embutidas em `Aquarius_SG.exe`.
- O executável é PE x86 compilado com Borland Delphi.
- Um nome encontrado em uma string prova que o texto existe no binário, mas não prova que toda a tabela é usada em todos os fluxos.
- Aliases, palavras de SQL, nomes de colunas e artefatos de parser foram removidos da classificação de tabelas.
- A confirmação de colunas, chaves, triggers, procedures e cardinalidades ainda exige schema Oracle ou análise Ghidra reconectada.

## Módulos observados

| Módulo | Evidência de tabelas/objetos |
| --- | --- |
| Acesso e segurança | `USUARIO`, `PERFIL`, `FUNCIONALIDADE`, `GRUPO_USUARIO`, `GRUPO_USUARIO_PERFIL`, `PERFIL_FUNCIONALIDADE`, `USUARIO_FILIAL`, `FILIAL_USUARIO_GRUPO_USUARIO`, `LOG_SISTEMA` |
| Organização | `EMPRESA`, `FILIAL`, `SERVIDOR`, `APLICACAO`, `VERSAO`, `APLICACAO_FUNCIONARIO` |
| Pessoas | `CLIENTE`, `CLIENTE_ENDERECO`, `FUNCIONARIO`, `FORNECEDOR`, `TRANSPORTADORA`, `MECANICO`, `PRESTADOR_SERVICO`, `PROFISSAO` |
| Produtos e catálogo | `PRODUTO`, `GRUPO`, `SUBGRUPO`, `FAMILIA`, `MARCA`, `FABRICANTE`, `CATEGORIA`, `CATEGORIA_MARCA`, `UNIDADE_MEDIDA`, `PRODUTO_CODIGO_BARRA`, `PRODUTO_IMAGEM`, `PRODUTO_SIMILAR` |
| Grade e ficha técnica | `GRADE_PRODUTO`, `GRADE_COR`, `GRADE_TAMANHO`, `PRODUTO_FICHA_TECNICA`, `FICHA_TECNICA_PRODUTO`, `FICHA_TECNICA_MERCADORIA`, `INSUMO`, `PORCAO_PRODUTO` |
| Estoque e inventário | `ESTOQUE_FILIAL`, `ESTOQUE_MOVIMENTACAO`, `ESTOQUE_ENTRADA`, `ESTOQUE_FISCAL`, `ESTOQUE_SERIAL`, `INVENTARIO`, `INVENTARIO_DIARIO`, `COLETA_INVENTARIO`, `LOCALIZACAO_PRODUTO`, `LOTE_PRODUTO`, `LOTE_PRODUTO_FILIAL` |
| Compras e fornecedores | `PEDIDO_COMPRA`, `FORNECEDOR_PRODUTO`, `RECEBIMENTO_ANALISE`, `RECEBIMENTO_COMPOSTO`, `ITENS_RECEBIMENTO_ANALISE`, `ITENS_ESTOQUE_ENTRADA` |
| Vendas e DAV | `PEDIDO_VENDA`, `ITENS_PEDIDO_VENDA`, `DAV_AGENDA_VENDA`, `DAV_AGENDA_VENDA_DAV`, `ITENS_DAV_AGENDA_VENDA`, `ORIGEM_DAV`, `VENDEDOR_SALDO`, `PLANO_VENDA`, `TABELA_PRECO`, `PROMOCAO` |
| Caixa e mesas | `CAIXA`, `CAIXA_MOVIMENTO`, `CAIXA_MOVIMENTO_DIARIO`, `MESA`, `MESA_FORMA_PAGAMENTO`, `MESA_IDENTIFICACAO`, `ITENS_MESA`, `ITENS_MESA_ACOMPANHAMENTO` |
| Financeiro | `CONTAS_PAGAR`, `CONTAS_PAGAR_DUPLICATA`, `PAGAMENTO_CONTAS_PAGAR`, `CONTAS_RECEBER`, `CONTAS_RECEBER_PARCELA`, `RECEBIMENTO_COMPOSTO`, `DUPLICATA`, `TITULO`, `TITULO_DESCONTO`, `CHEQUE`, `BOLETO_BANCARIO` |
| Fiscal | `NOTA_FISCAL`, `NOTA_FISCAL_PRODUTO`, `NOTA_FISCAL_NFE`, `NOTA_FISCAL_NFE_SEQUENCIA`, `NOTA_FISCAL_FORMA_PAGAMENTO`, `CFOP`, `NCM_TVA`, `CEST`, `CST_PIS_ENTRADA`, `CST_COFINS_SAIDA`, `IMPOSTO`, `TRIBUTO`, `SEF`, `SINTEGRA`, `EFD_PISCOFINS` |
| Licenciamento | `LICENCA`, `LICENCA_MAQUINA`, `LICENCA_CHAVES`, `LOG_LICENCA_MAQUINA`, `MAQUINA`, `AQUARIUS_SESSAO` |
| Serviços/oficina | `ORDEM_SERVICO`, `ORDEM_SERVICO_PRODUTO`, `ORDEM_SERVICO_SERVICO`, `ORDEM_SERVICO_SERIAL`, `SERVICO`, `TIPO_ORDEM_SERVICO`, `EQUIPAMENTO`, `EQUIPAMENTO_OPERACOES` |
| Produção e estamparia | `PRODUCAO`, `AGENDA_PRODUCAO`, `ITENS_AGENDA_PRODUCAO`, `FACCAO`, `ESTAMPARIA`, `ESTAMPA`, `PROCESSO_ESTAMPARIA`, `INDUSTRIALIZACAO`, `EXPEDICAO`, `SETOR_PRODUCAO` |
| Agenda/eventos/clube | `AGENDA_ENTREGA`, `AGENDA_TRANSPORTE`, `EVENTO`, `EVENTO_DATA`, `EVENTO_FUNCIONARIO`, `CLUBE_SERVICO`, `CLUBE_SOLICITACAO_SERVICO`, `SOCIO`, `SOCIO_EVENTO`, `LISTA_PRESENTE` |
| Logística | `TRANSPORTE`, `ENTREGA_EXPEDICAO_PRODUCAO`, `ENTREGADOR_EXPEDICAO`, `EXPEDICAO`, `TRANSPORTADORA`, `LOCALIZACAO_PRODUTO` |
| Armas/veículos | `REGISTRO_ARMA`, `ARMA_CALIBRE`, `ARMA_ESPECIE`, `ARMA_TIPO_ACAO`, `CHASSI`, `PLACA`, `RENAVAN`, `MODELO`, `MOTOR` |

## Tabelas temporárias e de importação

O binário referencia dezenas de tabelas `TEMP_*`, incluindo `TEMP_PRODUTO_XML`, `TEMP_FORNECEDOR_XML`, `TEMP_CLIENTE`, `TEMP_ESTOQUE_FILIAL_XML`, `TEMP_CFOP_XML`, `TEMP_NCM_TVA_XML`, `TEMP_PEDIDO_COMPRA`, `TEMP_PEDIDO_VENDA_LOTE`, `TEMP_CONTAS_RECEBER` e `TEMP_COLETA_INVENTARIO`. Elas devem ser tratadas como staging/importação, não como domínio principal.

## Integrações e dependências

- Oracle/ODBC: `MSDASQL.1`, alias `CSM_Aquarius`, porta 1521.
- Arquivos fiscais: XML de NF-e/NFC-e, diretórios de exportação/importação e FTP.
- Hardware: impressoras Daruma/Epson e balança em portas seriais.
- Bibliotecas: `libeay32.dll`, `libssl32.dll`, `ssleay32.dll`, `xercesxmldom.dll`, `vcltest3.dll`, Winsock e ADO/OLE DB.
- Serviços externos: strings referenciam AWS/CEP, WhatsApp e endpoints de atualização.

## Priorização para o Neon

1. `EMPRESA`, `FILIAL`, `USUARIO`, `PERFIL`, `FUNCIONALIDADE` e vínculos de acesso.
2. `CLIENTE`, `FUNCIONARIO`, `FORNECEDOR` e endereços.
3. `PRODUTO`, catálogo, preços, estoque e unidades.
4. `PEDIDO_VENDA`, itens, caixa e formas de pagamento.
5. Fiscal, financeiro, compras e integrações.
6. Produção, clube, oficina, armas e módulos especializados.

As migrations atuais cobrem apenas o núcleo administrativo novo. Nenhuma tabela do Oracle foi copiada automaticamente, pois ainda faltam DDL, tipos, constraints e autorização para migrar dados reais.
