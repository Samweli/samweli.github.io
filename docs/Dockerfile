FROM ruby:3.0

WORKDIR /srv/jekyll

RUN git config --global --add safe.directory /srv/jekyll

RUN gem install bundler:2.5.3

COPY Gemfile Gemfile.lock minimal-mistakes-jekyll.gemspec ./

RUN bundle install

VOLUME /srv/jekyll