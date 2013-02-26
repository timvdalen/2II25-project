main = report

all: once.a

once.%:
	pdflatex $(main)

clean:
	rm -f $(main).{aux,log,toc}

remove: clean
	rm -f $(main).pdf

release: remove once.a once.b once.c
