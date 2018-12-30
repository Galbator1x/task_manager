FROM ruby:2.6.0

RUN mkdir -p /task_manager
WORKDIR /task_manager

RUN apt-get update && apt-get install -y build-essential libpq-dev nodejs

COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 3

COPY . /task_manager

EXPOSE 3000
CMD bundle exec rails s -b '0.0.0.0' -p 3000
