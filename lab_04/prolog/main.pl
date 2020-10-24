% a(X, Y) :- writeNumber(X), write(" "), X < Y, X_NEW = X + 1, a(X_NEW, Y).
% writeNumber(X) :- X_NEW is X, write(X_NEW).

% echo:-readln(X), wtiteNumber(X + 1).
% wtiteNumber(X) :- X_NEW is X, write(X_NEW)

ok.
input(A, B) :- readln(A), readln(B); ok.
cicle(X, B) :- write(X), nl, Y is (X + 1), Y =< B, cicle(Y, B); ok.
f :- input(A, B), cicle(A, B); ok.
