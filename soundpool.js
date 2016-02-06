
var SoundPool = SoundPool || function()
{
    this.clear();
};

SoundPool.prototype.add = function(buffer, trackIndex, finishedCallback)
{
    this.buffers[trackIndex] = {
        start: this.index,
        buffer: buffer,
        numSamples: buffer.length,
        finished: finishedCallback
    };
};

SoundPool.prototype.stopTrack = function(trackIndex)
{
    this.buffers[trackIndex].finished();
    this.buffers[trackIndex] = null;
};

SoundPool.prototype.clear = function()
{
    this.buffers = [null, null, null, null, null, null, null, null];
    this.index = 0;
}

SoundPool.prototype.sample = function(array0, array1, arrayIndex)
{
    array0[arrayIndex] = 0;
    array1[arrayIndex] = 0;

    for(var i = 0; i < this.buffers.length; i++)
    {
        var buffer = this.buffers[i];
        if( buffer )
        {
            var start = buffer.start;
            var k = this.index-start;

            if( k < 0 )
            {
                continue;
            }

            if( k > buffer.numSamples )
            {
                buffer.finished();
                this.buffers[i] = null;
                continue;
            }

            var inarray = buffer.buffer.getChannelData(0);

            array0[arrayIndex] += inarray[k];
            array1[arrayIndex] += inarray[k];
        }
    }

    this.index++;
};

