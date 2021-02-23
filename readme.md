# Data Structures HW

Для реализации выбрал [AssemblyScript](https://www.assemblyscript.org/) чтобы соответсвовать требованию к ДЗ.  
В отличии от JS/TS у него есть [С-подобные массивы](https://www.assemblyscript.org/stdlib/staticarray.html).

## Usage

```
git clone https://github.com/borolgs/otus-data-structures.git
npm i
npm test
npm run start:array
npm run start:queue
```

# Dynamic Array

| Type    | Add (100000) | Get | Insert 0 | Insert x | Insert -1 | Remove 0 | Remove x | Remove -1 |
| ------- | ------------ | --- | -------- | -------- | --------- | -------- | -------- | --------- |
| Single  | 89830ms      | 0ms | 3ms      | 3ms      | 1ms       | 2ms      | 2ms      | 2ms       |
| Vector  | 834ms        | 0ms | 3ms      | 1ms      | 0ms       | 1ms      | 1ms      | 0ms       |
| Factor  | 16ms         | 0ms | 1ms      | 2ms      | 0ms       | 1ms      | 1ms      | 0ms       |
| Default | 5942ms       | 0ms | 0ms      | 1ms      | 0ms       | 0ms      | 0ms      | 0ms       |

## Array vs MyArray

По какой-то причине стандартный динамический массив в AssemblyScript работает медленее чем в JS и даже медленне чем мои собственные реализации VectorArray и FactorArray.
Возможно дело в молодости языка и малом количестве энтузиастов-контрибьюторов.

Но если предтставить, что придется использовать этот язык в продакшне здесь и сейчас, то навых самостоятельной реализации динамического массива уже пригодился.
