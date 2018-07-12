import { Array2DTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const tracer = new Array2DTracer();
const logger = new LogTracer();
const integer = new Randomize.Integer(5, 14).create();
const D = [];
const A = [];
for (let i = 0; i <= integer; i++) {
  D.push([]);
  D[0][i] = 1;
  D[i][1] = 1;
  for (let j = 0; j <= integer; j++) D[i][j] = 0;
}
tracer.set(D).delay();

function partition(A, n, p) {
  if (n === 0) logger.print(`[${A.join(', ')}]`);
  else {
    let end = n;
    if (p !== 0 && A[p - 1] < n) end = A[p - 1];
    for (let i = end; i > 0; i--) {
      A[p] = i;
      partition(A, n - i, p + 1);
    }
  }
}

function integerPartition(n) {
  // Calculate number of partitions for all numbers from 1 to n
  for (let i = 2; i <= n; i++) {
    // We are allowed to use numbers from 2 to i
    for (let j = 1; j <= i; j++) {
      // Number of partitions without j number + number of partitions with max j
      tracer.select(i, j).delay();
      D[i][j] = D[i][j - 1] + D[i - j][Math.max(j, i - j)];
      tracer.patch(i, j, D[i][j]).delay();
      tracer.depatch(i, j);
      tracer.deselect(i, j);
    }
  }
  return D[n][n];
}

logger.print(`Partitioning: ${integer}`);
partition(A, integer, 0);
const part = integerPartition(integer);
logger.print(part);
