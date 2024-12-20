FROM ruby:3.3-slim

ENV RUNTIME_DEPS imagemagick libmagickwand-dev file tzdata postgresql-client nodejs shared-mime-info
ENV BUILD_DEPS build-essential libcurl4-openssl-dev git libxml2-dev libxslt-dev libpq-dev libicu-dev libvips42

ENV APP_HOME /srv

RUN apt-get update && apt-get install --no-install-recommends -y $BUILD_DEPS $RUNTIME_DEPS && rm -rf /var/lib/apt/lists/*

RUN gem update --system && gem install bundler

RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME

RUN bundle install --jobs 4 --retry 5

ADD . $APP_HOME

ARG port=3000
EXPOSE $port

CMD ["bundle", "exec", "puma", "-p", "$port", "-C", "./config/puma.rb"]
