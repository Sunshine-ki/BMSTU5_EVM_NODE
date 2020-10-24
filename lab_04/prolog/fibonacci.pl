% swipl fibonacci.pl 
% f.

% С клавиатуры считываются числа A и B. 
% Необходимо вывести на экран все числа Фибоначчи, которые принадлежат отрезку от A до B.

% Выводит число, X если оно больше чем A. 
writeNumber(X, A) :- X_NEW is X, ((X >= A) -> write(X_NEW), write(" ");  write("")).

fib(PREV, CURR, A, B) :- 
	writeNumber(PREV, A),
	CURR =< B,
	fib(CURR, PREV + CURR, A, B).   

f :- read(A), read(B), fib(1, 1, A, B).