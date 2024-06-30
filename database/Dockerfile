FROM postgres:14
WORKDIR /app/database
COPY . .
# CMD ["cd", "scripts/"]
# CMD ["/bin/bash", "-c", "cd scripts/"]
# CMD cd scripts/
RUN /bin/bash -c 'cd scripts/'
EXPOSE 5432
