# Quotable
Basic AI conversation generator.

Version one of quotable is a simple javascript program that imitates the style of a text sample by formulating it as the output of a Markov process.

Version two (currently in development) extends this idea by adding deep learning to the mix. It estimates text as the output of a recurrent neural network with a hidden input "personality" vector calculated by another network. In this way we can leverage much larger samples of text; by mapping a text sample to a lower dimensional point in personality space, we can use text samples with similar qualities to supplement the output expected from the text sample given. Being written using python and the deep learning library Keras.

