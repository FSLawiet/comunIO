SELECT receitas.id,
       fontes_renda.nome as origem,
       receitas.valor,
       fonte_destino.nome as destino,
       receitas.data
FROM receitas, fontes_renda, fonte_destino
WHERE receitas.origem = fontes_renda.id
AND receitas.destino = fonte_destino.id;

SELECT despesas.id,
       gastos.nome AS gastos,
       gastos_detalhes.nome AS detalhamento,
       despesas.valor,
       fonte_destino.nome AS fonte,
       despesas.data
FROM despesas, gastos, gastos_detalhes, fonte_destino
WHERE despesas.gasto = gastos_detalhes.id AND
      gastos_detalhes.tipo = gastos.id AND
      despesas.fonte = fonte_destino.id;

SELECT investimentos.id,
opcoes_investimentos.nome AS opcao,
investimentos.valor,
fonte_destino.nome AS fonte,
investimentos.data
FROM investimentos, opcoes_investimentos, fonte_destino
WHERE investimentos.opcao = opcoes_investimentos.id
AND investimentos.fonte = fonte_destino.id;