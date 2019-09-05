FROM ruby:2.6.3

RUN mkdir -p /task_manager
WORKDIR /task_manager

RUN apt-get update && apt-get install -y build-essential libpq-dev
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN curl -sL https://deb.nodesource.com/setup_9.x | bash -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qqy && apt-get -qqyy install \
    nodejs \
    npm \
    yarn

COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 3

COPY . /task_manager

EXPOSE 3000
CMD bundle exec rails s -b '0.0.0.0' -p 3000
