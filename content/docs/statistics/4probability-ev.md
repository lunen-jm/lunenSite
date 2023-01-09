---
title: "Probability and Expected Values"
description: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
lead: "Doks is a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize."
date: 2023-1-09T08:48:57+00:00
lastmod: 2023-1-09T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "statistics"
weight: 040
toc: true
---

This document will go over probability, and build a foundation in basic frequency style probability models and testing.

Here's a link to the github that houses all of the course materials:

https://github.com/bcaffo/courses/tree/master/06_StatisticalInference

And a book: https://leanpub.com/LittleInferenceBook

http://datasciencespecialization.github.io/

# Probability Overview

Given a random experiment, a probability measure is a population quantity that summarizes the randomness. Typically, this is more of a conceptual thing that is not equivalent to the captured data, as you are trying to predict what will happen.

It takes a possible outcome from the experiment, assigns it a number between 1 and 0, with a 1 being the desired outcome typically. These outcomes need to be mutually exclusive however for basic probability.

Here are some rules it must follow:

- The probability that nothing occurs is 0
- The probability that something occurs is 1
- The probability of something is 1 minus the probability that the opposite occurs
- The probability of at least one of two (or more) things that can not simultaneously occur (mutually exclusive) is the sum of their respective probabilities
- If an event A implies the occurence of event B, then the probability of A occuring is less that the probability that B occurs
- For any two events, the probability that at least one occurs is the sum of their probabilities minus their intersection

## Random Variables

A random variable is a numerical outcome of an experiment. They can be one of two types:

* **Discrete**: Ones you can count, such as number of times something occurs, or categorical outcomes such as hair colors
* **Continous**:  They can take any value in a continuum. For these, we will assign a probability to every value they can take, typically with some bins as well

## Probability Mass Functions

Probability Calculus is useful for understanding the rules that probabilities must follow, however we need ways to model and think about the proabilities for numeric outcomes. 

A probability mass function evluated at a value corresponds to the probability that a random variable takes that value. To be a valid PMF function (`p`), it must satisfy:

* It must always be larger than or equal to 0
* The sum of the possible values that the random variable can take has to add up to one

This modelling typically works for discrete variables.

Here's an example of one, using the Bernoulli distribution:

```
X = 0 means Tails
X = 1 means Heads

p(x) = (1/2)^x * (1/2)^(1-x) for x = 0, 1

p(0) = (1/2)^0 * (1/2)^(1), which is 1/2
p(1) = (1/2)^1 * (1/2)^(0), which is 1/2

But, this one works if it's a perfect coin (50/50 chance). What happens if it's skewed?

We can use this function instead, where theta (Θ)(alt+233) is the probability:

p(x) = Θ^x * (1-Θ)^(1-x) for x = 0, 1

p(0) = Θ^1 * (1-Θ)^(1-1) = Θ
p(1) = Θ^0 * (1-Θ)^(1-0) = 1-Θ

This is useful for modeling the prevalence of something, using a sample. Remember, the issue is that we don't know Θ!
```

## Probability Density Functions

A probability density function (pdf) is a function associated with a continous random variable. Here are its rules:

* It must be larger than or equal to zero everywhere
* The total area under it must be one 

Areas under the PDFs correspond to probabilities for that random variable.

Here's a simple example for the following equation:

```
f(x) = {2x for 0<x<1
        {0 otherwise

This function means it is equal to f(x)=2x from 0-1, and then it equals 0 otherwise (so a right triangle essentially)
```

The plot itself looks like this:

```{r pdf1}
x <- c(-0.5, 0, 1, 1, 1.5)
y <- c(0, 0, 2, 0 , 0)
plot(x, y, lwd = 3, frame = FALSE, type = "l")
```

Now, let's answer the question "What is the probability that 75% or fewer outcomes occur"

```{r pdf2}
1.5*.75/2
```

56.25%. This is because .75 is 75%, and the y-value is 1.5 (simple triangle math). This PDF is actually known as the `beta distribution`, and can be called using the `pbeta()` function. The letter `p` in front of a function asks for probabilities.

In the following code, we use this function to find the value:

```{r pdf3}
pbeta(.75, 2, 1)
```

While this function wasn't super necessary for the simple question above, it will be much more useful for complicated calculations later on.

### Cumulative Distribution Function and Survival Function

The cumulative distribution function (CDF) of a random variable, `X`, returns the probability that the random variable is less than or equal to the value `x`:

`F(x) = P(X <= x)`

This applies whether the variable is discrete or continous. In the previous example that used the `pbeta()` function, it was actually providing a CDF because it showed that the probabilityt was 56.25% or less that something would occur.

The survival function of a random variable `X` is defined as the probability that the random variable is greater than the value of `x`:

`S(x) = P(X > x)`, which can be re-written as `S(x) = 1 - f(x)`, where `f(x)` is the CDF.

## Sample Quantiles

Sample quantiles are fairly simple, as your height growing up was often communicated as "You're in the 95th percentile of heignht for your age". So, 95% are shorter, and 5% are taller.

↔(alt + 8759) stands for "proportional to". 

The ↔^th^ quantile of a distribution with distribution function **F** is the point **x~↔~** so that:

**F(x~↔~) = ↔**

Can't do subscripts in code chunks unfortunately, which is why this section is formatted differently.

For the ↔ quantiles, a percentile is simplay a quantile with `↔` expressed as a percent, and the median is the 50th percentile.

Just like how we added `p` in the `pbeta()` function for probabilities, we can put a `q` in front for quantiles (`qbeta()`).

## Summary

While you may have heard of the median before, the median refereed to in this section is the `population median`, since we're talking about populaiton quantiles.

A probability model connects the data to the population using assumptions, which means the the median we're discussing is the `estimand`, whereas the median of the sample is the `estimator`.

Really, this just means that we're linking our sample to a population.

# Conditional Probability 

Here's a quick mathematical definition of conditional probability:

* Let `B` be an event so that `P(B) > 0` (the event can happen)
* `P(A|B) =  P(A ^ B) / P(B)`, where `^` is the intersect symbol (can't make it)
* "Probability of A given that B has occured is equal to the probability of the intersection divided by the probability of B"
* If A & B turn out to be statistically insignificant (unrelated), then it should be equal to probability of A 

For the probability of a dice being a 1, given the information that an odd number has been rolled, works out to the following:

* Since A lies entirely in B (1 is an odd number), the intersection is the probability of A (1/6). The probability of B is 1/2.
* `P(A|B) = (1/6)/(1/2) = 1/3`

While this is a fairly straightforward example, there will be more advanced applications of this later.

## Bayes' rule 

Bayes' rule allows us to reverse the role of the conditioning set and the set we want the probability of. I.E., what if want `P(B|A)` if we can easily find `P(A|B)`.

Here is the equation:

* **P(B|A) = (P(A|B)P(B))/(P(A|B)P(B) + P(A|B^c^)P(B^c^))**

In this equation, we can see that we need a third thing, and that is the **probability of b marginalized over a**.

## Diagnostic Tests 

Diagnostic tests can be used to show this realtionship. Here are the constraints for this example:

* Let **+** and **-** be the events that the result of a diagnostic test is positive or negative
* Let **D** and **D^c^** be the event that the subject of the test has or does not have the disease
* This would mean that the sensitivity of the test is equal to **P(+|D)** (Probability of the test being positive, given that the subject has it)
* The specificity would be equal to **P(-|D^c^)** (probability of the test being negative, given the subject doesn't have it)
* If you take the test, and it's positive, you are likely concerned about the positive predictor value
        * PPV = **P(D|+)** (probability that subject has it, given the positive test)
* Vice versa, you are worried about the negative predictive value, which is **P(D^c^|-)**
* In the absence of a test, the prevalence of the disease is equal to **P(D)**

If you have a HIV test, where the sensitivity is 99.7%, and the specificity is 98.5%, and a subject from a populaiton with a 0.1% prevalence of HIV received a positive result, what is the associated positive predictor value?

This would be the **P(D|+)**. Here's the equation:

* **P(+|D)** = 99.7%, **P(-|D^c^)** = 98.5%, **P(D)** = 0.1%. Also, **P(+|D^c^)** = 1.5%, and **P(D^c^)** = 99.9% since it's the inverse
* **P(D|+) = (P(+|D)P(D))/(P(+|D)P(D) + P(+|D^c^)P(D^c^))**
* **P(D|+) = (.997 * 0.001)/((.997 * 0.001) + (.015*.999)) = .062**

While a 6.2% value seems very low, this is due to only 0.1% of the population having it. However, let's say that the subject is actually a part of a more at-risk population (intravenous drug-user). The relevant population prevalence would likely be much higher than 0.1%, and so they would be more likely to actually have it.

We can look into this more by taking a look at the diagnostic likelihood ratios.

### Likelihood ratios 

If you were to change the formula above to instead measure the **P(D^c^|+)**, you would notice that the denominator is identical in both equations.

If you were to then divide the formulas by each other **P(D|+)/P(D^c^|+)**, you would get the following:

* **P(D|+)/P(D^c^|+) = (P(+|D)/P(+|D^c^) * (P(D)/P(D^c^)))**
* On the left, you have the odds of the disease given a positive result, and on the right we have the odds of the disease without a test. The center value is the diagnostic likelihood ratio.
* Post-test odds = Diagnostic Likelihood Ratio * Pre-test odds
* **DLR~+~** of above test is **.997/(1-.985) = 66**

This means that no matter what your pre-test odds were, you would multiply them by 66 to obtain your post-test odds, as the **hypothesis of disease (DLR)** is 66 times more supported by the data than the hypothesis of no disease.

The post-test odds of having the disease despite a negative test is around .003 (.3%), as that is the **DLR~-~** ((1-.997)/.985).

## Independence

Earlier, we stated that event A is independent of event B if **P(A|B) = P(A) where P(B) > 0**. Another definition is that:

* **P(A^B) = P(A)P(B)**, where ^ is the intersect symbol 

This means they are independent if the probability of the intersection of A and B works out to be the product of their probabilities.

Going back to the coin flip, here is how it would work out:

* A (head on flip 1) = .5
* B (head on flip 2) = .5
* A ^ B = .5*.5 = .25

While this one is fairly easy to prove, let's think about a more complex example.

Let's say a mother had a 1/8543 chance of having an infant die of infant death syndrome. She was convicted of murdering her two children, as the chance of that occuring naturally was figured to be (1/8543)^2^, which is very low. However, this assumes that the events are independent if they occur twice, which they likely aren't!

Remember, we are typically looking for independent and identically distributed (IID) variables for our analysis. IID sampling is the default model of sampling.

# Expected Values

Finding expected values is the process of making conclusions about populations from noisy data that was drawn from it.

Here are some expected values that we know already:

* Mean - a characterization of the center, also known as the center of mass
* Variance and Standard Deviation - characterization of how spread out it is 

Like earlier, we can use sample expected values to estimate population values. 

Since the mean is known as the center of mass, it can be thought of the balancing point of the data. The below chart takes a look at this concept by using the `manipulate()` function to change the mean. As you move the mean towards the "actual" mean, you can notice that the mean square error gets lower. 

```{r ev1, eval = FALSE}
library(manipulate)
myHist <- function(mu){
        g <- ggplot(galton, aes(x = child))
        g <- g + geom_histogram(fill = "salmon", binwidth=1, aes(y = ..density..), color = "black")
        g <- g + geom_density(size = 2)
        g <- geom_vline(xintercept = mu, size = 2)
        mse <- round(mean((galton$child - mu)^2), 3)
        g <- g + labs(title = paste('mu = ', mu, 'MSE = ', mse))
        g
}
manipulate(myHist(mu), mu = slider(62, 74, step = 0.5))
```

This is also known as a measure of imbalance. This chart needs to be run in RStudio, so check it there instead of this document :)

## Simple examples 

Here's a simple example of an expected value. 

Suppose a coin is flipped, and X is decalred 0 or 1 corresponding to a head or a tail. The EV would be:

* **E[x] = .5*0 + .5*1 = .5**

If you were to place this in a chart, it would be very clear that a .5 value balances it out, as both bars are the same height.

But what if the coin was biased?

Suppose that a random variable, X, is so that **P(X = 1) = p** and **P(X = 0) - (1-p)** (probability of A is equal to 1-B). Then:

* **E[x] = 0(1-p)+1*p=p**

If you apply this to a 6-sided dice, you get:

* **E[x] = 1(1/6) + 2(1/6) + 3(1/6) + 4(1/6) + 5(1/6) + 6(1/6) = 3.5**

While this may seem like wrong since we can't actually get this number form the dice, if you look at the chart it is clear that the balance point is at 3.5.

## Expected Values for PDFs 

For a continous random variable, X, with density, f, the expected value is still the center of the mass of the density. Keep in mind that the average of random variables is in itself a random variable, and its associated distribution has an expected value. 

A sample mean is unbiased if its distribution is centered at what its trying to estimate.

Here is an example of the expected values of a coin flip, where the average of a number of flips is taken 2000 times.

```{r pdfEVs}
library(tidyverse)
library(reshape2)
library(ggplot2)
coinFlip = function(n) sample(0:1, n, rep=T)

flips <- data.frame(matrix(ncol = 4, nrow = 0))
colnames(flips) <- c("one", "five", "ten", "twenty")
str(flips)
for(i in 1:2000){

        one <- coinFlip(1)
        five <- coinFlip(5)
        ten <- coinFlip(10)
        twenty <- coinFlip(20)

        flips <- rbind(flips, data.frame(mean(one), mean(five), mean(ten), mean(twenty)))
}
flips <- melt(flips, value.name = "Means")
str(flips)
ggplot(flips, aes(x = Means, fill = variable)) + 
        geom_histogram() +
        facet_grid(cols = vars(flips$variable))
```

Keep in mind that 1, 5, 10, and 20 are the counts of flips for each sample

As we can see, the mean expected values start to converge toward the true mean as you take the average of larger samples from the population each time (which is infinite in this case).
